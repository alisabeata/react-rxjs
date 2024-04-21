import React, { useEffect, useMemo } from 'react'
import { Subject, interval } from 'rxjs'
import { switchMap, startWith } from 'rxjs/operators'

const RestartableInterval = () => {
  // Using useMemo to memoize the Subject instance
  const restartSubject = useMemo(() => new Subject(), []) // This subject will be used to trigger the restart

  useEffect(() => {
    // Create an observable that restarts the interval every time the subject emits
    const interval$ = restartSubject.pipe(
      startWith(0), // Emit immediately on subscription
      switchMap(() => interval(1000)), // Restart interval on each emission
    )

    // Subscribe to the interval observable
    const subscription = interval$.subscribe({
      next: (value) => console.log(`Tick: ${value}`),
      error: (err) => console.error('Interval error:', err),
      complete: () => console.log('Interval completed'),
    })

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [restartSubject])

  // Function to trigger the restart
  const restartInterval = () => {
    restartSubject.next() // Emitting a value triggers the interval to restart
  }

  return (
    <div>
      <button onClick={restartInterval}>Restart Interval</button>
    </div>
  )
}

export default RestartableInterval
