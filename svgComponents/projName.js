import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function ProjName(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <G stroke="#0D101C" strokeMiterlimit={10}>
        <Path d="M11 5.5v3c0 2-.5 2.5-2.5 2.5h-5c-2 0-2.5-.5-2.5-2.5v-5C1 1.5 1.5 1 3.5 1h.75c.75 0 .915.22 1.2.6l.75 1c.19.25.3.4.8.4h1.5c2 0 2.5.5 2.5 2.5z" />
        <Path
          d="M4 1h4.5c1 0 1.5.5 1.5 1.5v.69"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default ProjName
