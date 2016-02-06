var $ = require('jquery'),
    React = require('react'),
    Picker = require('react-picker');

var options = [
  'one',
  'two',
  'three',
  'four'
]

var OptionBox = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getInitialState() {
    return {
      value: this.props.value || 'N/A'
    }
  },

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value || 'N/A'
    })
  },

  render() {
    return (
      <div className="box" onClick={this._handleClick}>
        <label>{this.state.value}</label>
      </div>
    )
  },

  _handleClick(e) {
    this.props.onClick && this.props.onClick(e)
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      vote_1: options[0],
      vote_2: options[1],
      vote_3: options[2],
      submitting: false
    }
  },

  _handleVote1Change(value) {
    this.setState({vote_1: value});
  },

  _handleVote1Click() {
    this.refs.vote1Selection.show();
  },

  _handleVote2Change(value) {
    this.setState({vote_2: value});
  },

  _handleVote2Click() {
    this.refs.vote2Selection.show();
  },

  _handleVote3Change(value) {
    this.setState({vote_3: value});
  },

  _handleVote3Click() {
    this.refs.vote3Selection.show();
  },

  _submit() {
    this.setState({submitting: true});

    var data = {
      fingerprint: $('#fingerprint').text(),
      vote_1: this.state.vote_1,
      vote_2: this.state.vote_2,
      vote_3: this.state.vote_3
    };

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzdqU05WWCFReBVIMtYWTKKVXSjRLKy3Ev1iIwP2zmB1q67hG-t/exec",
      type: "post",
      data: data,
      dataType: 'json',
      success: this._submitSuccess
    });
  },

  _submitSuccess() {
    this.setState({submitting: false});
  },

  render() {
    var vote_1 = this.state.vote_1,
        vote_2 = this.state.vote_2,
        vote_3 = this.state.vote_3;

    var btnHtml = <span>Vote!</span>;
    if(this.state.submitting) {
      btnHtml = <i className="fa fa-2x fa-spinner fa-spin"></i>;
    }

    return (
      <div className="list-area">
        <div style={{textAlign: 'center', paddingBottom: 24}}>
          <h1>Vote for your favourite<br></br> Food/Drink combos!</h1>
        </div>

        <ul>
          <li>
            <label>1st Choice</label>
            <div className="edit">
              <Picker ref="vote1Selection"
                      value={vote_1}
                      options={options}
                      onChange={this._handleVote1Change}
                      width="250px">
                <OptionBox value={vote_1} onClick={this._handleVote1Click} />
              </Picker>
            </div>
          </li>

          <li>
            <label>2nd Choice</label>
            <div className="edit">
              <Picker ref="vote2Selection"
                      value={vote_2}
                      options={options}
                      onChange={this._handleVote2Change}
                      width="250px">
                <OptionBox value={vote_2} onClick={this._handleVote2Click} />
              </Picker>
            </div>
          </li>

          <li>
            <label>3rd Choice</label>
            <div className="edit">
              <Picker ref="vote3Selection"
                      value={vote_3}
                      options={options}
                      onChange={this._handleVote3Change}
                      width="250px">
                <OptionBox value={vote_3} onClick={this._handleVote3Click} />
              </Picker>
            </div>
          </li>
        </ul>

        <button type="button"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            borderRadius: 0,
            width: '100%',
            height: '48px',
            backgroundColor: '#5cb85c',
            border: 0,
            color: 'white',
            fontSize: 18,
            cursor: 'pointer'
          }}
          onClick={this._submit}>
          {btnHtml}
        </button>
      </div>
    );
  }
});

module.exports = App;
