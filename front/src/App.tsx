import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'
import React from 'react'
import './App.scoped.scss'

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className="container">{process.env.REACT_APP_ENV_NAME}</main>
        <Footer />
      </div>
    )
  }
}
