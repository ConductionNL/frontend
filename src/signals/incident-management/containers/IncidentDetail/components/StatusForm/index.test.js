import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import { withAppContext } from 'test/utils';
import incidentFixture from 'utils/__tests__/fixtures/incident.json';
import statusList, { changeStatusOptionList } from '../../../../definitions/statusList';

import { PATCH_TYPE_STATUS } from '../../constants';
import IncidentDetailContext from '../../context';
import StatusForm, { emailSentWhenStatusChangedTo, MELDING_EXPLANATION, DEELMELDING_EXPLANATION } from '.';

const defaultTexts = [
  {
    state: 'ingepland',
    templates: [
      { title: 'Ingepland', text: 'Over 1 dag' },
      { title: 'Ingepland', text: 'Over 2 dagen' },
      { title: '', text: '' },
    ],
  },
  {
    state: 'o',
    templates: [
      { title: 'Niet opgelost', text: 'Geen probleem gevonden' },
      { title: 'Niet opgelost', text: 'Niet voor regio Amsterdam' },
      { title: 'Opgelost', text: 'Lamp vervangen' },
      { title: 'Opgelost', text: 'Lantaarnpaal vervangen' },
    ],
  },
];

const close = jest.fn();
const update = jest.fn();

const renderWithContext = (incident = incidentFixture) =>
  withAppContext(
    <IncidentDetailContext.Provider value={{ incident, update, close }}>
      <StatusForm defaultTexts={defaultTexts} />
    </IncidentDetailContext.Provider>
  );

describe('signals/incident-management/containers/IncidentDetail/components/StatusForm', () => {
  beforeEach(() => {
    close.mockReset();
    update.mockReset();
  });

  it('renders correctly', () => {
    const { container, getByTestId, getByLabelText, getByText } = render(renderWithContext());

    expect(container.querySelector('textarea')).toBeInTheDocument();
    expect(getByTestId('statusFormSubmitButton')).toBeInTheDocument();
    expect(getByTestId('statusFormCancelButton')).toBeInTheDocument();

    Object.values(changeStatusOptionList).forEach(({ value }) => {
      expect(getByLabelText(value)).toBeInTheDocument();
    });

    expect(getByTestId('statusFormSendEmailField')).toBeInTheDocument();
    expect(getByText(MELDING_EXPLANATION)).toBeInTheDocument();
  });

  it('shows default texts', () => {
    const stateWithTexts = defaultTexts[0].state;

    const { getByText, getByTestId, queryByTestId } = render(renderWithContext());

    const radioButton = getByTestId(`status-${stateWithTexts}`);

    expect(queryByTestId('defaultTextsTitle')).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(radioButton);
    });

    expect(queryByTestId('defaultTextsTitle')).toBeInTheDocument();

    Object.values(defaultTexts[0].templates).forEach(({ text }) => {
      if (text) expect(getByText(text)).toBeInTheDocument();
    });
  });

  it('does not show default texts', () => {
    const { getByTestId, queryByTestId } = render(renderWithContext());

    expect(queryByTestId('defaultTextsTitle')).not.toBeInTheDocument();

    act(() => {
      changeStatusOptionList.forEach(({ key }) => {
        const radioButton = getByTestId(`status-${key}`);
        fireEvent.click(radioButton);

        expect(queryByTestId('defaultTextsTitle')).not.toBeInTheDocument();
      });
    });
  });

  it('applies default text selection', () => {
    const stateWithTexts = defaultTexts[0].state;

    const { container, getByTestId, getAllByTestId } = render(renderWithContext());

    const radioButton = getByTestId(`status-${stateWithTexts}`);

    act(() => {
      fireEvent.click(radioButton);
    });

    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toEqual('');

    act(() => {
      fireEvent.click(radioButton);
    });

    const useTextButton1 = getAllByTestId('defaultTextsItemButton')[0];

    act(() => {
      fireEvent.click(useTextButton1);
    });

    expect(textarea.value).toEqual(defaultTexts[0].templates[0].text);

    const useTextButton2 = getAllByTestId('defaultTextsItemButton')[1];

    act(() => {
      fireEvent.click(useTextButton2);
    });

    expect(textarea.value).toEqual(defaultTexts[0].templates[1].text);
  });

  it('should alert on presence of specific characters', () => {
    global.alert = jest.fn();

    const { container, getByTestId } = render(renderWithContext());

    act(() => {
      fireEvent.click(getByTestId('statusFormSubmitButton'));
    });

    expect(global.alert).not.toHaveBeenCalled();

    const textarea = container.querySelector('textarea');

    act(() => {
      fireEvent.change(textarea, { target: { value: '{{ replace_me }}' } });
    });

    act(() => {
      fireEvent.click(getByTestId('statusFormSubmitButton'));
    });

    expect(global.alert).toHaveBeenCalled();

    global.alert.mockRestore();
  });

  it('should handle submit', () => {
    const { getByTestId } = render(renderWithContext());

    expect(close).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();

    act(() => {
      fireEvent.change(getByTestId('text'), { target: { value: 'Some text' } });
    });

    act(() => {
      fireEvent.click(getByTestId('statusFormSubmitButton'));
    });

    expect(update).toHaveBeenCalledWith({
      type: PATCH_TYPE_STATUS,
      patch: {
        status: {
          state: incidentFixture.status.state,
          text: 'Some text',
          send_email: false,
        },
      },
    });
    expect(close).toHaveBeenCalled();
  });

  it("doesn't show the send checkbox for a deelmelding", () => {
    const statusThatShowsCheckbox = changeStatusOptionList.find(
      ({ email_sent_when_selected }) => email_sent_when_selected
    );

    const deelmelding = {
      ...incidentFixture,
      status: {
        state: statusThatShowsCheckbox.key,
      },
      _links: {
        ...incidentFixture._links,
        'sia:parent': {
          href: 'https://acc.api.data.amsterdam.nl/signals/v1/private/categories/106',
          public: 'https://acc.api.data.amsterdam.nl/signals/v1/public/terms/categories/civiele-constructies',
        },
      },
    };

    const { queryByTestId, getByText } = render(renderWithContext(deelmelding));

    expect(queryByTestId('statusFormSendEmailField')).not.toBeInTheDocument();
    expect(getByText(DEELMELDING_EXPLANATION)).toBeInTheDocument();
  });

  it('disables the send checkbox when an excluded state is selected', () => {
    const { getByTestId } = render(renderWithContext());

    expect(getByTestId('statusFormSendEmailField')).toBeInTheDocument();

    changeStatusOptionList.forEach(({ key: state }) => {
      const checkboxIsDisabled = emailSentWhenStatusChangedTo(state);
      const radioButton = getByTestId(`status-${state}`);

      act(() => {
        fireEvent.click(radioButton);
      });

      expect(getByTestId('statusFormSendEmailField').disabled).toEqual(checkboxIsDisabled);
    });
  });

  it('should disable the submit button when the incident status cannot be set manually', () => {
    const changeStatusOptionListKeys = changeStatusOptionList.map(({ key }) => key);
    const statusThatIsNotSelectable = statusList.find(({ key }) => changeStatusOptionListKeys.includes(key) === false);

    const incident = {
      ...incidentFixture,
      status: {
        state: statusThatIsNotSelectable.key,
      },
    };

    const { getByTestId } = render(renderWithContext(incident));

    expect(getByTestId('statusFormSubmitButton').disabled).toEqual(true);
  });
});
