import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Person(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M23.858 21.96c-1.852-3.2-4.761-5.447-8.14-6.4a8.203 8.203 0 10-7.435 0c-3.38.952-6.288 3.198-8.141 6.4a.703.703 0 101.216.704c2.251-3.89 6.229-6.21 10.642-6.21 4.413 0 8.39 2.32 10.642 6.21a.702.702 0 101.216-.703zM5.203 8.25A6.797 6.797 0 1112 15.047 6.805 6.805 0 015.203 8.25z"
        fill="#471AA0"
      />
    </Svg>
  )
}

export default Person
