import React from 'react'

const Progress_bar = ({ value }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 h-4">
            <div
                className="bg-black text-xs font-medium text-blue-100 text-center flex items-center justify-center h-4 rounded-full transition-all duration-300"
                style={{ width: value }}
            >
                {value}
            </div>
        </div>
    )
}


export default Progress_bar
