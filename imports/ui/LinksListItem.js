import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export class LinksListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      justCopied: false
    };
  }

  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success',() => {
      this.setState({justCopied:true});
      setTimeout(() => {this.setState({justCopied:false});},1000);
    }).on('error',() => {
      alert('Please it worng');
    })
  }

  componentWillUnmount(){
    this.clipboard.destroy();
  }

  renderStats(){
    const visitMessage = this.props.visitedCount===1 ? 'visit' : 'visits';
    let visitedMessage = null;
    const last = moment(this.props.lastVisitedAt);

    if (typeof this.props.lastVisitedAt ==='number') {
      visitedMessage = `(visited ${last.fromNow()})`;
    } else {

    }

      return (<p className='item__message'>{this.props.visitedCount} {visitMessage} {visitedMessage} </p>);
  }

  render(){
    return (
      <div className='item'>
        <h2 key={this.props._id}> {this.props.url}</h2>
        <p className='item__message' key={this.props.userId}> {this.props.shortUrl}</p>
        {this.renderStats()}
        <a className='button button--pill button--link' href={this.props.shortUrl} target="_blank">visit</a>
        <button className='button button--pill' ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className='button button--pill' onClick={() => {
          Meteor.call('links.setVisibility',this.props._id,!this.props.visible)
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }

}

LinksListItem.propTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    visitedCount:React.PropTypes.number.isRequired,
    lastVisitedAt:React.PropTypes.number
};
