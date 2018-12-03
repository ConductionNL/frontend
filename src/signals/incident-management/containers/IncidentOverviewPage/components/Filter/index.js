import React from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup } from 'react-reactive-form';
import { isEqual } from 'lodash';

import './style.scss';
import FieldControlWrapper from '../../../../components/FieldControlWrapper';
import TextInput from '../../../../components/TextInput';
import SelectInput from '../../../../components/SelectInput';
import DatePickerInput from '../../../../components/DatePickerInput';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    if (props.filter) {
      this.filterForm.setValue(props.filter);
    }
  }

  componentDidMount() {
    console.log('filter componentDidMount');
    this.filterForm.get('main_slug').valueChanges.subscribe((value) => {
      console.log('CHANGE', value);
      // this.props.onMainCategoryFilterSelectionChanged(value);
      // this.filterForm.get('sub_slug').reset(['']);
      // this.filterForm.get('sub_slug').updateValueAndValidity();
    });
  }

  componentDidUpdate(props) {
    console.log('filter componentDidUpdate', props);
    if (!isEqual(props.categories, this.props.categories)) {
      this.filterForm.get('main_slug').setValue((this.props.filter && this.props.filter.main_slug) || [['']]);
      this.filterForm.get('sub_slug').setValue((this.props.filter && this.props.filter.sub_slug) || [['']]);
    }
  }

  onFilter = (filter) => {
    this.props.onRequestIncidents({ filter });
  }

  filterForm = FormBuilder.group({
    id: [''],
    incident_date_start: [''],
    location__stadsdeel: [['']],
    priority__priority: '',
    main_slug: [['']],
    sub_slug: [['']],
    status__state: [['']],
    location__address_text: [''],
  });

  handleReset = () => {
    this.filterForm.reset();
    this.onFilter(this.filterForm.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.onFilter(this.filterForm.value);
  }

  render() {
    console.log('filter render');
    const { categories, statusList, stadsdeelList, priorityList } = this.props;
    return (
      <div className="filter-component">
        <div className="filter-component__title">Filters</div>
        <div className="filter-component__body">
          <FieldGroup
            control={this.filterForm}
            render={({ invalid }) => (
              <form onSubmit={this.handleSubmit}>
                <div>
                  <FieldControlWrapper
                    render={TextInput}
                    name="id"
                    display="Id"
                    control={this.filterForm.get('id')}
                  />
                  <FieldControlWrapper
                    render={DatePickerInput}
                    name="incident_date_start"
                    display="Datum"
                    control={this.filterForm.get('incident_date_start')}
                    placeholder={'JJJJ-MM-DD'}
                  />
                  <FieldControlWrapper
                    render={SelectInput}
                    name="priority__priority"
                    display="Urgentie"
                    control={this.filterForm.get('priority__priority')}
                    values={priorityList}
                    emptyOptionText="Alles"
                  />
                  <FieldControlWrapper
                    render={SelectInput}
                    name="location__stadsdeel"
                    display="Stadsdeel"
                    control={this.filterForm.get('location__stadsdeel')}
                    values={stadsdeelList}
                    emptyOptionText="Alle stadsdelen"
                    multiple
                  />
                  <FieldControlWrapper
                    render={SelectInput}
                    name="main_slug"
                    display="Hoofdcategorie"
                    control={this.filterForm.get('main_slug')}
                    values={categories.main}
                    emptyOptionText="Alles"
                    multiple
                    useSlug
                    size={10}
                  />
                  <FieldControlWrapper
                    render={SelectInput}
                    name="sub_slug"
                    display="Subcategorie"
                    control={this.filterForm.get('sub_slug')}
                    values={categories.sub}
                    emptyOptionText="Alles"
                    multiple
                    useSlug
                    size={10}
                  />
                  <FieldControlWrapper
                    render={SelectInput}
                    name="status__state"
                    display="Status"
                    control={this.filterForm.get('status__state')}
                    values={statusList}
                    emptyOptionText="Alle statussen"
                    multiple
                  />
                  <FieldControlWrapper
                    render={TextInput}
                    name="location__address_text"
                    display="Adres"
                    control={this.filterForm.get('location__address_text')}
                  />

                  <button className="action tertiair" onClick={this.handleReset} type="button">
                    <span className="value">Reset filter</span>
                  </button>
                  <button className="action primary" type="submit" disabled={invalid}>
                    <span className="value">Zoek</span>
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

Filter.defaulProps = {
  categories: {
    main: [],
    sub: []
  }
};

Filter.propTypes = {
  stadsdeelList: PropTypes.array,
  categories: PropTypes.object,
  priorityList: PropTypes.array,
  statusList: PropTypes.array,
  filter: PropTypes.object,
  onRequestIncidents: PropTypes.func.isRequired,
  // onMainCategoryFilterSelectionChanged: PropTypes.func.isRequired
};

export default Filter;
