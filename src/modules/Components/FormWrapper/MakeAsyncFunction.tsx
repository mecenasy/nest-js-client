import * as React from 'react'
import PropTypes from 'prop-types'

export default class MakeAsyncFunction extends React.Component<any, any> {
  props: any
  state: any

  static propTypes = {
    children: PropTypes.func.isRequired,
    listener: PropTypes.object.isRequired,
    start: PropTypes.string.isRequired,
    resolve: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    setPayload: PropTypes.func,
    getPayload: PropTypes.func,
    getError: PropTypes.func
  }

  constructor(props: any) {
    super(props)
    if (
      process.env.NODE_ENV !== 'production' &&
      typeof props.children !== 'function'
    ) {
      console.error('Warning: Must provide a render function as children')
    }
    const {
      listener,
      start,
      resolve,
      reject,
      setPayload,
      getPayload,
      getError
    } = props
    this.state = {
      asyncFunction: listener.createAsyncFunction({
        start,
        resolve,
        reject,
        setPayload,
        getPayload,
        getError
      })
    }
  }

  unsubscribe = () => {
    if (this.state.asyncFunction) {
      this.state.asyncFunction.unsubscribe()
    }
  }

  createAsyncFunction = () => {
    const {
      listener,
      start,
      resolve,
      reject,
      setPayload,
      getPayload,
      getError
    } = this.props
    this.unsubscribe()
    this.setState({
      asyncFunction: listener.createAsyncFunction({
        start,
        resolve,
        reject,
        setPayload,
        getPayload,
        getError
      })
    })
  }

  componentDidMount() {
    this.createAsyncFunction()
  }

  componentDidUpdate(prevProps: any) {
    if (
      prevProps.start !== this.props.start ||
      prevProps.resolve !== this.props.resolve ||
      prevProps.reject !== this.props.reject
    ) {
      this.createAsyncFunction()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.props.children && this.state.asyncFunction
      ? this.props.children(this.state.asyncFunction.asyncFunction)
      : null
  }
}