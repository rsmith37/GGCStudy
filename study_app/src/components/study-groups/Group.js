import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getEventById } from '../../actions/eventActions';

class Group extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getEventById(this.props.match.params.id);
    }
  }

  render() {
    const { event, eventLoading } = this.props.event;

    return (
      <div>
        
      </div>
    )
  }
}

Group.propTypes = {
  getEventById: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, { getEventById })(Group);
