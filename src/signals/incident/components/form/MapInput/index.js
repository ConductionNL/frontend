// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2018 - 2021 Gemeente Amsterdam
import PropTypes from 'prop-types'

import MapInputComponent from 'components/MapInput'
import MapContext from 'containers/MapContext'
import configuration from 'shared/services/configuration/configuration'
import MAP_OPTIONS from 'shared/services/configuration/map-options'
import { formatMapLocation } from 'shared/services/map-location'

import FormField from '../FormField'

const MapInput = ({
  handler,
  touched,
  hasError,
  meta,
  parent,
  getError,
  validatorsOrOpts,
}) => {
  const value = formatMapLocation(handler().value || {})
  const { lat, lng } = value?.location || {}
  const mapOptions = {
    ...MAP_OPTIONS,
    center: lat && lng ? [lat, lng] : [...MAP_OPTIONS.center],
  }

  // Can't use useCallback here, would break the rules of hooks
  const onLocationChange = (location) => {
    parent.meta.updateIncident({ location })
  }

  return (
    meta?.isVisible && (
      <FormField
        className="mapInput"
        meta={meta}
        options={validatorsOrOpts}
        touched={touched}
        hasError={hasError}
        getError={getError}
      >
        <div className="invoer">
          <MapContext>
            <MapInputComponent
              id={meta.name}
              aria-label={configuration.language.mapDescription}
              aria-describedby={meta.subtitle && `subtitle-${meta.name}`}
              onChange={onLocationChange}
              value={value}
              mapOptions={mapOptions}
              hasGPSControl
            />
          </MapContext>
        </div>
      </FormField>
    )
  )
}

MapInput.propTypes = {
  handler: PropTypes.func,
  touched: PropTypes.bool,
  getError: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  meta: PropTypes.object,
  parent: PropTypes.object,
  validatorsOrOpts: PropTypes.object,
}

export default MapInput
