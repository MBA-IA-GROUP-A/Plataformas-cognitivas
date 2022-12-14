import React from 'react'
import logo from './logo.svg'
import './App.scoped.scss'
import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>{process.env.REACT_APP_ENV_NAME}</main>
        <Footer />
      </div>
    )
  }
}
