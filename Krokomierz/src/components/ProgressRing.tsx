import { View, Text } from 'react-native'
import React from 'react'
import { Svg, Circle } from 'react-native-svg'

type ProgressRingProps = {
    radius?: number;
    strokeWidth?: number;
    progress : number;
}

const color = '#ed2647';

const ProgressRing = ({radius = 100, strokeWidth = 35, progress}: ProgressRingProps) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

  return (
    <View style={{width:radius*2, height:radius*2, alignSelf:'center'}}>
        <Svg>
            {/* background */}
            <Circle 
            cx={radius}
            cy={radius} 
            r={innerRadius}  
            strokeWidth={strokeWidth} 
            stroke={color} 
            opacity={0.2}
            />
            {/* foreground */}
    
            <Circle 
            r={innerRadius}  
            cx={radius} 
            cy={radius} 
            originX={radius}
            originY={radius}
            fill={'#252525'} 
            strokeWidth={strokeWidth} 
            stroke={color} 
            strokeDasharray={[circumference * progress, circumference]} 
            strokeLinecap='round' 
            rotation={-90}
            />
        </Svg>
    </View>
  )
}

export default ProgressRing