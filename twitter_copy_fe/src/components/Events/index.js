import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import * as usersactions from '../../actions/users';
import EventRow from '../EventRow';
import './styles.css';

const Events = ({ 
  events,
  isLoading, 
  onLoad 
}) => {
  useEffect(onLoad, []);
    return (
        <Fragment>
            {
                events.length === 0 && !isLoading && (
                    <p>{'No hay Events publicados'}</p>
                )
            }
            {
                isLoading && (
                    <p>{'Cargando...'}</p>
                )
            }
            {
                events.length > 0 && !isLoading && (
                    <div>
                        <div>
                            {console.log(events)}
                            {
                                events.map(({ id }) => <EventRow key={id} id={id} />)
                            }
                            
                        </div>
                    </div>
                )
            }
        </Fragment>
    );
};

export default connect(
  state => ({
    events: selectors.getEvents(state),
    isLoading: selectors.isFetchingEvents(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingEvents());
      dispatch(usersactions.startFetchingUsers());
    },
  }),
)(Events);
