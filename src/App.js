import { useState } from 'react'
import './App.css'
import EventClickButton from './components/EventClickButton'
import ObservableComponent from './components/ObservableComponent'
import SubjectComponent from './components/SubjectComponent'
import MergeMapTwoInputs from './components/MergeMapTwoInputs'
import SwitchMapRestartInterval from './components/SwitchMapRestartInterval'
import BehaviorSubjectComponent from './components/BehaviorSubjectComponent'

function App() {
  const [isHidden, setIsHidden] = useState(false)

  const handleToggleObservable = () => {
    setIsHidden(!isHidden)
  }

  return (
    <>
      <EventClickButton />
      {!isHidden && <ObservableComponent />}
      <button onClick={handleToggleObservable}>Toggle Observable</button>
      <SubjectComponent />
      <MergeMapTwoInputs />
      <SwitchMapRestartInterval />
      <BehaviorSubjectComponent />
    </>
  )
}

export default App
