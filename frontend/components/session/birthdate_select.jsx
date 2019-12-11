import React from 'react';

export default class BirthDateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "1",
      day: "1",
      year: "1994"
    };
  }

  componentDidMount() {
    // this.setState(this.state);
  }

  handleSelect(type) {
    return e => {
      this.setState({ [type]: e.target.value });

      const state = Object.assign({}, this.state);
      const birthdate = state.year + "/" + state.month + "/" + state.day;
      
      this.props.handleChildInput("birth_date", birthdate);
    }
  }

  render() {
    const dayOptions = [];
    for (let i = 1; i <= 31; i++) {
      dayOptions.push(<option value={i} key={i}>{i}</option>);
    }

    const yearOptions = [];
    for (let i = 1905; i <= 2019; i++) {
      yearOptions.push(<option value={i} key={i}>{i}</option>);
    }
    
    return(
      <span className="birthdate_wrapper">
        <label>Birthday</label>
        <select value={this.state.month} onChange={this.handleSelect("month")}>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
        <select value={this.state.day} onChange={this.handleSelect("day")}>
          {dayOptions}
        </select>
        <select value={this.state.year} onChange={this.handleSelect("year")}>
          {yearOptions}
        </select>
      </span>
    )
  }
}