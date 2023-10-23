import React, { useEffect } from "react";

const Loader = (props) => {
    const [progress, setProgress] = React.useState(10)
    const {
        size = 150,
        trackWidth = 2,
        trackColor = `#44444444`,
        indicatorWidth = 5,
        indicatorColor = `#048b8b`,
        indicatorCap = `round`,
        label = 'loading...',
        labelColor = `#fff`,
        spinnerMode = true,
        spinnerSpeed = 3,
        load = false,
        setLoading = () => { }
    } = props

    const center = size / 2,
        radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100)

    useEffect(() => {
        if (!load) {
            for (let i = 10; i <= 100; i++) {
                setTimeout(() => {
                    setProgress(i)
                }, 100)
            }
            setTimeout(() => {
                setLoading(false)
            }, 200)
        }
    }, [load])

    return (
        <div className="loader">
            <div
                className="svg-pi-wrapper"
                style={{ width: size, height: size }}
            >
                <svg
                    className="svg-pi"
                    style={{ width: size, height: size }}
                >
                    <circle
                        className="svg-pi-track"
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={trackWidth}
                    />
                    <circle
                        className={`svg-pi-indicator ${spinnerMode ? "svg-pi-indicator--spinner" : ""
                            }`}
                        style={{ animationDuration: spinnerSpeed * 1000 }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={indicatorColor}
                        strokeWidth={indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        strokeLinecap={indicatorCap}
                    />
                </svg>

                <div
                    className="svg-pi-label"
                    style={{ color: labelColor }}
                >
                    <span className="svg-pi-label__loading">
                        {load ? label : "Done!"}
                    </span>

                    {!spinnerMode && (
                        <span className="svg-pi-label__progress">
                            {`${progress > 100 ? 100 : progress
                                }%`}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Loader