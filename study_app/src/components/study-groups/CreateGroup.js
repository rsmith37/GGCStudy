import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createEvent } from '../../actions/eventActions'

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      subject: '',
      title: '',
      location: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const eventData = {
      start: this.state.start,
      end: this.state.end,
      subject: this.state.subject,
      title: this.state.title,
      location: this.state.location,
      name: user.name
      // attendees: [user]
    }

    this.props.createEvent(eventData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    // Select options for major
    const subjectOptions = [
      { label: '* Select subject', value: 0 },
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
      <div className="create-group">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create a new study group meeting</h1>
              <p className="lead text-center">
                Please provide the following infromation
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Start date"
                  name="start"
                  type="datetime-local"
                  value={this.state.start}
                  onChange={this.onChange}
                  error={errors.start}
                  info="Starting date and time for the meeting"
                />
                <TextFieldGroup 
                  placeholder="* End date"
                  name="end"
                  type="datetime-local"
                  value={this.state.end}
                  onChange={this.onChange}
                  error={errors.end}
                  info="Ending date and time for the meeting"
                />
                <TextFieldGroup 
                  placeholder="* Meeting title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="A title for the meeting, for example the exam or project"
                />
                <SelectListGroup
                  placeholder="subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.onChange}
                  options={subjectOptions}
                  error={errors.subject}
                  info="Course subject for the meeting"
                />
                <TextFieldGroup 
                  placeholder="* Meeting location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="The location of the meeting"
                />
                <input type="submit" value="Submit" className="btn btn-success btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createEvent })(withRouter(CreateGroup));
