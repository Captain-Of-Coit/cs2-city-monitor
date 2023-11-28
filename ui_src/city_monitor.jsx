import React from 'react'
import {$Meter, $Panel, $Button, $Field, useDataUpdate} from 'hookui-framework'

const engineEffect = (react, event, setFunc) => {
    const updateEvent = event + ".update"
    const subscribeEvent = event + ".subscribe"
    const unsubscribeEvent = event + ".unsubscribe"

    return react.useEffect(() => {
        var clear = engine.on(updateEvent, (data) => {
            console.log(updateEvent, data)
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

// const eventsToListenTo = [
//     ['Electricity', 'electricityInfo.electricityAvailability', "maxGood"],
//     ['Water Availability', 'waterInfo.waterAvailability', "maxGood"],
//     ['Sewage', 'waterInfo.sewageAvailability', "maxGood"],
//     ['Landfill Usage', 'garbageInfo.landfillAvailability', "maxGood"],
//     // TODO Incineration
//     ['Healthcare Availability', 'healthcareInfo.healthcareAvailability', "maxGood"],
//     ['Average Health', 'healthcareInfo.averageHealth', "maxGood"],
//     ['Cemetery Availability', 'healthcareInfo.cemeteryAvailability', "maxGood"],
//     // TODO Crematorium
//     ['Fire Hazard', 'fireAndRescueInfo.averageFireHazard', "minGood"],
//     ['Crime Rate', 'policeInfo.averageCrimeProbability', "minGood"],
//     ['Jail Availability', 'policeInfo.jailAvailability', "maxGood"],
//     ['Elementary School Availability', 'educationInfo.elementaryAvailability', "maxGood"],
//     ['High School Availability', 'educationInfo.highSchoolAvailability', "maxGood"],
//     ['College Availability', 'educationInfo.collegeAvailability', "maxGood"],
//     ['University Availability', 'educationInfo.universityAvailability', "maxGood"],
//     // TODO Employment Rate
// ]

// Data coming from C# part

const $MetersPage = ({react, data}) => {
    const meters = Object.keys(data).map((k) => {
        const {label, eventName, gradientName} = data[k]
        const [meterState, setMeterState] = react.useState(-1)
        engineEffect(react, eventName, setMeterState)
        return <$Meter key={eventName} label={label} value={meterState} gradient={gradientName}/>
    })

    return <div>
        {...meters}
    </div>
}

const $SettingsPage = ({react, data}) => {

    const toggles = Object.keys(data).map((k) => {
        const {label, isEnabled} = data[k]
        return <$Field label={label} checked={isEnabled} onToggle={() => {}}/>
    })

    return <div>
        {...toggles}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}

const __data = {
    'electricity': {
        label: 'Electricity',
        eventName: 'electricityInfo.electricityAvailability',
        index: 0,
        gradientName: 'maxGood',
        isEnabled: true
    }
}

const $CityMonitor = ({react}) => {
    const [showSettings, setShowSettings] = react.useState(false)

    const [data, setData] = react.useState(__data)

    const handleToggle = (k, newValue) => {
        engine.trigger('city_monitor.toggle_visibility', [k, newValue])
    }

    const toRender = showSettings ? <$SettingsPage react={react} data={data}/> : <$MetersPage react={react} data={data}/>
    const buttonLabel = showSettings ? "Meters" : "Settings";

    return <div>
        <$Panel title="City Monitor" react={react}>
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