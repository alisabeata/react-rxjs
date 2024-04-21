import React, { useEffect } from 'react'
import { Subject } from 'rxjs'

const SubjectComponent = () => {
  useEffect(() => {
    const subject = new Subject()

    // Subscriber 1
    const subscription1 = subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    })

    // Subscriber 2
    const subscription2 = subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    })

    // Emitting values
    subject.next(1)
    subject.next(2)

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      subscription1.unsubscribe()
      subscription2.unsubscribe()
    }
  }, []) // Empty dependency array ensures this effect only runs once

  return <p>Check your console to see the output from the RxJS Subject.</p>
}

export default SubjectComponent
