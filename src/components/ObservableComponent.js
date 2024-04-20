import React, { useEffect } from 'react'
import { Observable } from 'rxjs'

const ObservableComponent = () => {
  useEffect(() => {
    // Create a new Observable instance that emits values
    const observable = new Observable((subscriber) => {
      // Emitting a value
      subscriber.next('Hello')
      subscriber.next('World')

      // Uncomment below to see error handling
      // subscriber.error('Something went wrong!');

      // Complete the observable stream
      subscriber.complete()

      // Optional: Return a teardown or cleanup function
      return () => console.log('Observable has been unsubscribed')
    })

    // Subscribe to the observable to receive the emitted values
    const subscription = observable.subscribe({
      next(x) {
        console.log('Received Value: ' + x)
      },
      error(err) {
        console.log('Received an Error: ' + err)
      },
      complete() {
        console.log('Stream completed')
      },
    })

    // Cleanup function to unsubscribe when component unmounts
    return () => subscription.unsubscribe()
  }, []) // Empty array ensures this effect runs only once after initial render

  return (
    <div>
      <h1>RxJS Observable in React</h1>
      <p>Check the console for output.</p>
    </div>
  )
}

export default ObservableComponent
