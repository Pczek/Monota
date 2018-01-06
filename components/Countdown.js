import React from 'react'
import { PropTypes } from 'prop-types'
import { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import CountingNumber from './CountingNumber'
import DeadlineTitle from './DeadlineTitle'

import { removeCountdown } from '../actions/index'

class Countdown extends Component {

  static propTypes = {
    countdown: PropTypes.object.isRequired,
  }

  componentDidMount () {
    this.recalculateCountdown()
    this.intervalId = setInterval(() => {
      this.recalculateCountdown()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  recalculateCountdown = () => {
    const {countdown} = this.props
    const {date} = countdown

    let overallMillis = date - new Date()
    const days = Math.floor(overallMillis / DAY_IN_MILLIS)
    if (days !== 0) {
      overallMillis = overallMillis % (days * DAY_IN_MILLIS)
    }
    const hours = Math.floor(overallMillis / HOUR_IN_MILLIS)
    if (hours !== 0) {
      overallMillis = overallMillis % (hours * HOUR_IN_MILLIS)
    }

    const minutes = Math.floor(overallMillis / MINUTE_IN_MILLIS)
    if (minutes !== 0) {
      overallMillis = overallMillis % (minutes * MINUTE_IN_MILLIS)
    }
    const seconds = Math.floor(overallMillis / SECOND_IN_MILLIS)

    this.setState({
      totalMillisLeft: date - new Date(),
      seconds,
      minutes,
      hours,
      days,
    })
  }

  renderCountdown () {
    const {totalMillisLeft, seconds, minutes, hours, days} = this.state
    const {countdown} = this.props

    const adaptValue = (value) => value < 10 ? `0${value}` : `${value}`
    const remaining = {
      days: {
        name: 'Tage',
        value: adaptValue(days),
      },
      hours: {
        name: 'Stunden',
        value: adaptValue(hours)
      },
      minutes: {
        name: 'Minuten',
        value: adaptValue(minutes)
      },
      seconds: {
        name: 'Sekunden',
        value: adaptValue(seconds)
      },
    }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <DeadlineTitle value={countdown.title} />
        </View>

        <View style={styles.bottom}>
          <View>
            <View style={styles.row}>
              {totalMillisLeft < 0
                ? <Text>Zu spät digger, der Zug ist abgefahren...</Text>
                : ['days', 'hours', 'minutes', 'seconds'].map(key => {
                  if (remaining[key].value <= 0 && key !== 'seconds') return null
                  return (
                    <CountingNumber
                      key={key}
                      value={remaining[key].value}
                      label={remaining[key].name}
                    />
                  )
                })
              }
            </View>
            <Text style={styles.deadlineDate}>
              bis zum {this.props.countdown.date.toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric' // TODO only show if next year
            })}
            </Text>
          </View>
          <View style={styles.buttonContainer}>

            <Button
              onPress={this.props.onDone}
              title={totalMillisLeft < 0 ? 'Das war wohl nix' : 'Das wird nix'}
              color="#FC5C63"
            />
            {totalMillisLeft < 0
              ? null
              : <Button
                onPress={this.props.onDone}
                title="Erledigt"
                color="#FC5C63"
              />
            }
          </View>
        </View>
      </View>
    )
  }

  render () {
    if (!this.state) {
      return null
    }
    return (this.renderCountdown())
  }
}

const DAY_IN_MILLIS = 1000 * 60 * 60 * 24
const HOUR_IN_MILLIS = 1000 * 60 * 60
const MINUTE_IN_MILLIS = 1000 * 60
const SECOND_IN_MILLIS = 1000

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: 16,
    flexDirection: 'column',
  },
  top: {
    flex: 4,
  },
  bottom: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  deadlineDate: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

})

export default connect(null, {onDone: removeCountdown})(Countdown)
