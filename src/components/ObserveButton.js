import React, { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { throttleTime, map } from 'rxjs/operators'

const ObserveButton = () => {
  const buttonRef = useRef(null)

  useEffect(() => {
    if (buttonRef.current) {
      // Use pipe to apply multiple operators
      const buttonClicks = fromEvent(buttonRef.current, 'click').pipe(
        throttleTime(1000), // Throttle clicks to once per second, allows to init function by click once per second
        map((event) => event.timeStamp), // wrap each instance, get timeStamp val from the event object
      )

      // Subsctibe
      const subscription = buttonClicks.subscribe((data) => {
        console.log(data)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  return <button ref={buttonRef}>Click me</button>
}

export default ObserveButton
