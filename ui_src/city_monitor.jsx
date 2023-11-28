import React from 'react'
import {$Meter, $Panel, useDataUpdate} from 'hookui-framework'

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

const eventsToListenTo = [
    ['Electricity', 'electricityInfo.electricityAvailability', "maxGood"],
    ['Water Availability', 'waterInfo.waterAvailability', "maxGood"],
    ['Sewage', 'waterInfo.sewageAvailability', "maxGood"],
    ['Landfill Usage', 'garbageInfo.landfillAvailability', "maxGood"],
    // TODO Incineration
    ['Healthcare Availability', 'healthcareInfo.healthcareAvailability', "maxGood"],
    ['Average Health', 'healthcareInfo.averageHealth', "maxGood"],
    ['Cemetery Availability', 'healthcareInfo.cemeteryAvailability', "maxGood"],
    // TODO Crematorium
    ['Fire Hazard', 'fireAndRescueInfo.averageFireHazard', "minGood"],
    ['Crime Rate', 'policeInfo.averageCrimeProbability', "minGood"],
    ['Jail Availability', 'policeInfo.jailAvailability', "maxGood"],
    ['Elementary School Availability', 'educationInfo.elementaryAvailability', "maxGood"],
    ['High School Availability', 'educationInfo.highSchoolAvailability', "maxGood"],
    ['College Availability', 'educationInfo.collegeAvailability', "maxGood"],
    ['University Availability', 'educationInfo.universityAvailability', "maxGood"],
    // TODO Employment Rate
]

const $CityMonitor = ({react}) => {
    const meters = eventsToListenTo.map(([label, eventName, gradient]) => {      
        const [read, set] = react.useState(-1)
        engineEffect(react, eventName, set)
        return <$Meter key={eventName} label={label} value={read} gradient={gradient}/>
    })

    return <div>
        <$Panel title="City Monitor" react={react}>
            {...meters}
        </$Panel>
    </div>
}

window._$hookui.registerPanel({
    id: "example.city-monitor",
    name: "City Monitor",
    icon: "Media/Game/Icons/BuildingLevel.svg",
    component: $CityMonitor
})