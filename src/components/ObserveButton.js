import React, { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'

const ObserveButton = () => {
  const buttonRef = useRef(null)

  useEffect(() => {
    if (buttonRef.current) {
      const buttonClicks = fromEvent(buttonRef.current, 'click')

      const subscription = buttonClicks.subscribe(() => {
        console.log('Button was clicked!')
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  return <button ref={buttonRef}>Click me</button>
}

export default ObserveButton
