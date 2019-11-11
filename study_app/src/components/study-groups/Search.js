import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchEvents } from '../../actions/eventActions';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      start: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const searchData = {
      subject: this.state.subject,
      start: this.state.start
    }

    this.props.searchEvents(searchData);
  }

  render() {
    const { errors } = this.state;

    // Select options for subject
    const subjectOptions = [
      { label: 'Any/All', value: '' },
      { label: 'AFAM', value: 'AFAM' },
      { label: 'ANTH', value: 'ANTH' },
      { label: 'ARTS', value: 'ARTS' },
      { label: 'BCHM', value: 'BCHM' },
      { label: 'BIOL', value: 'BIOL' },
      { label: 'BUSA', value: 'BUSA' },
      { label: 'CHEM', value: 'CHEM' },
      { label: 'CHIN', value: 'CHIN' },
      { label: 'CJCR', value: 'CJCR' },
      { label: 'CMAP', value: 'CMAP' },
      { label: 'COMM', value: 'COMM' },
      { label: 'ECON', value: 'ECON' },
      { label: 'EDUC', value: 'EDUC' },
      { label: 'ELAN', value: 'ELAN' },
      { label: 'ELED', value: 'ELED' },
      { label: 'EMAT', value: 'EMAT' },
      { label: 'ENGL', value: 'ENGL' },
      { label: 'ESCI', value: 'ESCI' },
      { label: 'ESNS', value: 'ESNS' },
      { label: 'ESSS', value: 'ESSS' },
      { label: 'EXSC', value: 'EXSC' },
      { label: 'FILM', value: 'FILM' },
      { label: 'FINA', value: 'FINA' },
      { label: 'FREN', value: 'FREN' },
      { label: 'GEOG', value: 'GEOG' },
      { label: 'GFA', value: 'GFA' },
      { label: 'GGC', value: 'GGC' },
      { label: 'GLOB', value: 'GLOB' },
      { label: 'HDAS', value: 'HDAS' },
      { label: 'HIST', value: 'HIST' },
      { label: 'HNRS', value: 'HNRS' },
      { label: 'ISCI', value: 'ISCI' },
      { label: 'ITEC', value: 'ITEC' },
      { label: 'LEAD', value: 'LEAD' },
      { label: 'MATH', value: 'MATH' },
      { label: 'MGED', value: 'MGED' },
      { label: 'MGMT', value: 'MGMT' },
      { label: 'MKTG', value: 'MKTG' },
      { label: 'MSL', value: 'MSL' },
      { label: 'MUSC', value: 'MUSC' },
      { label: 'NURS', value: 'NURS' },
      { label: 'PHED', value: 'PHED' },
      { label: 'PHIL', value: 'PHIL' },
      { label: 'PHYS', value: 'PHYS' },
      { label: 'POLS', value: 'POLS' },
      { label: 'PSCI', value: 'PSCI' },
      { label: 'PSYC', value: 'PSYC' },
      { label: 'READ', value: 'READ' },
      { label: 'RELN', value: 'RELN' },
      { label: 'SCM', value: 'SCM' },
      { label: 'SOCI', value: 'SOCI' },
      { label: 'SPAN', value: 'SPAN' },
      { label: 'SPED', value: 'SPED' },
      { label: 'STEC', value: 'STEC' },
      { label: 'THEA', value: 'THEA' }
    ];

    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="subject">Subject of Meeting</label>
              <SelectListGroup
                  placeholder="subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.onChange}
                  options={subjectOptions}
                  error={errors.subject}
                />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="start">Day of Meeting</label>
              <TextFieldGroup 
                  placeholder="* Start date"
                  name="start"
                  type="date"
                  value={this.state.start}
                  onChange={this.onChange}
                  error={errors.start}
                />
            </div>
            <input type="submit" value="Search" className="btn btn-success btn-block"/>
          </div>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  searchEvents: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { searchEvents })(Search);