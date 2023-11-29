import React from 'react'
import {$Meter, $Panel, $Button, $Field, useDataUpdate} from 'hookui-framework'

const engineEffect = (react, event, setFunc) => {
    const updateEvent = event + ".update"
    const subscribeEvent = event + ".subscribe"
    const unsubscribeEvent = event + ".unsubscribe"

    return react.useEffect(() => {
        var clear = engine.on(updateEvent, (data) => {
            // console.log(updateEvent, data)
            if (data.current !== undefined && data.min !== undefined && data.max !== undefined) {
                const percentage = ((data.current - data.min) / (data.max - data.min)) * 100;
                setFunc(percentage);
            } else {
                // console.warn(`${updateEvent} didn't have the expected properties`, data);
                setFunc(data);
            }
        })
        engine.trigger(subscribeEvent)
        return () => {
            engine.trigger(unsubscribeEvent)
            clear.clear();
        };
    }, [])
}

const sortFunc = (data) => {
    return (a, b) => {
        if(data[a].index < data[b].index) {
            return -1
        } else if (data[a].index > data[b].index) {
            return 1
        }
        return 0
    }
}

const $MetersPage = ({react, data}) => {
    let keys = Object.keys(data)
    keys.sort(sortFunc(data))

    const meters = keys.map((k) => {
        const {label, eventName, gradientName, isEnabled} = data[k]
        if (isEnabled) {
            const [meterState, setMeterState] = react.useState(-1)
            engineEffect(react, eventName, setMeterState)
            return <$Meter key={eventName} label={label} value={meterState} gradient={gradientName}/>
        }
    }).filter(i => i)

    return <div>
        {...meters}
    </div>
}

const $SettingsPage = ({react, data, onToggle}) => {
    let keys = Object.keys(data)
    keys.sort(sortFunc(data))

    const toggles = keys.map((k) => {
        const {label, isEnabled} = data[k]
        return <$Field label={label} checked={isEnabled} onToggle={(newCheckedValue) => {
            onToggle(k, newCheckedValue)
        }}/>
    })

    return <div>
        {...toggles}
    </div>
}

const $CityMonitor = ({react}) => {
    const [showSettings, setShowSettings] = react.useState(false)

    const [data, setData] = react.useState({})

    useDataUpdate(react, "city_monitor.meters", setData)

    const handleToggle = (k, newValue) => {
        engine.trigger('city_monitor.toggle_visibility', k, newValue)
    }

    let toRender = null
    if (showSettings) {
        toRender = <$SettingsPage react={react} data={data} onToggle={handleToggle}/>
    } else {
        toRender = <$MetersPage react={react} data={data}/>
    }

    const buttonLabel = showSettings ? "Meters" : "Settings";

    const style = {
        height: "auto"
    }

    return <div>
        <$Panel title="City Monitor" react={react} style={style}>
            <$Button label={buttonLabel} onClick={() => setShowSettings(!showSettings)}/>
            {toRender}
        </$Panel>
    </div>
}

window._$hookui.registerPanel({
    id: "example.city-monitor",
    name: "City Monitor",
    icon: "Media/Game/Icons/BuildingLevel.svg",
    component: $CityMonitor
})