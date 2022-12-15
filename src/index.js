import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from 'Redux/store'
import ThemeProvider from './ThemeProvider'
import App from './App'
import SignIn from 'SignIn'
import CreateCompaign from 'CreateCompaign'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<App />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/create' element={<CreateCompaign />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
