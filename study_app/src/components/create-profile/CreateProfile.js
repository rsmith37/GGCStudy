import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      major: '',
      year: '',
      bio: '',
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

    const profileData = {
      handle: this.state.handle,
      major: this.state.major,
      year: this.state.year,
      bio: this.state.bio
    }

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    // Select options for major
    const majorOptions = [
      { label: '* Select major', value: 0 },
      { label: 'Biology', value: 'Biology' },
      { label: 'Business administration', value: 'Business administration' },
      { label: 'Chemistry', value: 'Chemistry' },
      { label: 'Cinema and media arts production', value: 'Cinema and media arts production' },
      { label: 'Criminal justice/criminology', value: 'Criminal justice/criminology' },
      { label: 'Elementary education', value: 'Elementary education' },
      { label: 'English', value: 'English' },
      { label: 'Environmental science', value: 'Environmental science' },
      { label: 'Exercise science', value: 'Exercise science' },
      { label: 'History', value: 'History' },
      { label: 'Human development and aging services', value: 'Human development and aging services' },
      { label: 'Information technology', value: 'Information technology' },
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Middle grades education', value: 'Middle grades education' },
      { label: 'Nursing', value: 'Nursing' },
      { label: 'Political science', value: 'Political science' },
      { label: 'Psychology', value: 'Psychology' },
      { label: 'Special education', value: 'Special education' },
      { label: 'Undecided', value: 'Undecided' },
    ];

    // Select options for year
    const yearOptions = [
      { label: '* Select year', value: 0 },
      { label: '1st Year/Freshman', value: '1st Year/Freshman' },
      { label: '2nd Year/Sophomore', value: '2nd Year/Sophomore' },
      { label: '3rd Year/Junior', value: '3rd Year/Junior' },
      { label: '4th Year/Senior', value: '4th Year/Senior' },
      { label: '5th Year/Senior', value: '5th Year/Senior' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Please provide the following infromation
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Profile Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique username for your profile URL"
                />
                <SelectListGroup
                  placeholder="Major"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  options={majorOptions}
                  error={errors.major}
                  info="Your currently declared major"
                />
                <SelectListGroup
                  placeholder="Year"
                  name="year"
                  value={this.state.year}
                  onChange={this.onChange}
                  options={yearOptions}
                  error={errors.year}
                  info="Your current year"
                />
                <TextAreaFieldGroup 
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  options={yearOptions}
                  error={errors.bio}
                  info="Tell us a little about yourself"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
