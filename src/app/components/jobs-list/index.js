'use strict';

import React from 'react';
import classnames from 'classnames';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';
import kebabCase from 'lodash/string/kebabCase';
import getFeaturedImage from 'app/lib/get-featured-image';

import Flux from 'app/flux';
import JobItem from 'app/components/job-item';
import Rimage from 'app/components/rimage';

const JobsList = React.createClass({
  getInitialState() {
    return {
      selectedJob: null
    }
  },
  renderJobItem(job) {
    return (
      <JobItem
        key={`job-${job.shortcode}`}
        job={job}
        colour={this.getStudioColour(job)}
        open={this.state.selectedJob === job.shortcode}
        onClick={this.generateOnClickJobItemHandler(job)}
      />
    );
  },
  generateOnClickJobItemHandler(job) {
    return () => {
      const jid = job.shortcode;
      if (this.state.selectedJob === jid) {
        this.setState({ selectedJob: null });
        Flux.resetJobOpen();
      } else {
        this.setState({ selectedJob: jid });
        Flux.getJobDetails(jid);
      }
    }
  },
  getStudioColour(job) {
    const { studios } = this.props;
    let studio = find(studios, 'name', job.location.city);
    if(!studio) {
      studio = find(studios, 'name', 'London');
    }
    return studio.color;
  },
  render() {
    const { jobs, studio, contactEmail, className } = this.props;

    let output;
    if (jobs.length) {
      output = jobs.map(this.renderJobItem);
    } else {
      output = (
        <li className="jobs-none">
          <p>We don’t have any specific openings at the moment, but we’re always on the lookout for talented individuals to join the ustwo family. If that’s you, let us know.</p>
          <a
            style={{backgroundColor: studio.color}}
            href={contactEmail.length ? `${contactEmail}?subject=${studio.name} Jobs` : ''}
          >
            Get in touch
          </a>
        </li>
      );
    }

    return (
      <ul className={`jobs-list ${className}`} ref="jobsList">
        {output}
      </ul>
    );
  }
});

export default JobsList;
