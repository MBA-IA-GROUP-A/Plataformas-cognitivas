import Footer from '@components/footer/footer.component'
import Header from '@components/header/header.component'
import Data from '@interfaces/data.interface'
import React from 'react'
import './App.scoped.scss'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IState {
  model: 'federation_model' | 'cluster_model' | 'classification_model'
  data: Array<Array<Data>>
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      model: 'federation_model',
      data: [[]],
    }
  }

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
