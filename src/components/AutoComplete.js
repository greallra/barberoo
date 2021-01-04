import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styled from 'styled-components'

const WrapperInputStyle = styled.div`
    padding: 18.5px 14px;

    width: 100%;
    border-bottom: 1px solid rgba(188, 188, 188);
`
const inputStyle = {
    width: '100%',
    border: 'none',
    outline: 'none'
}

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: '', 
        lat: undefined, 
        lng: undefined 
    };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    let results = { lat: '',  lng: '', address: '' }
    geocodeByAddress(address)
      .then(data => {
        this.setState({ address: data[0].formatted_address });
        results.address = data[0].formatted_address;
        return getLatLng(data[0])
      })
      .then(latLng =>{
        results.lat = latLng.lat;
        results.lng = latLng.lng;
        this.props.setGeo(results)
        this.props.setGeoValid(true)
      })
      .catch(error => {
          console.error('Error', error)
          this.props.setGeo({}) 
          this.props.setGeoValid(false)
    });
  };

 
 
  render() {
    return (

      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        style={inputStyle}
      >
       
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <WrapperInputStyle>
            <input
                style={inputStyle}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </WrapperInputStyle>
        )}
      </PlacesAutocomplete>
 
    );
  }
}