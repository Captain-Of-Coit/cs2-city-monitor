import React from 'react';

const $Meter = ({label, value, gradient}) => {
    const gradientStyle = {
        "backgroundImage": gradient
    }
    const pointerStyle = {
        left: value + "%"
    }
    return <div className="infoview-panel-section_RXJ">
        <div className="content_1xS focusable_GEc item-focused_FuT">
            <div className="labels_L7Q row_S2v">
                <div className="uppercase_RJI left_Lgw row_S2v">{label}</div>
            </div>
            <div className="bar_nW3">
                <div className="gradient_P8C" style={gradientStyle}></div>
                <div className="pointer_SV2" style={pointerStyle}>
                    <img className="pointerIcon_i8i" src="Media/Misc/IndicatorBarPointer.svg"></img>
                </div>
            </div>
            {/* <div className="labels_L7Q row_S2v tiny_m9B">
                <div className="left_Lgw row_S2v">Consumption: 50.8 kW</div>
                <div className="right_k3O row_S2v">Production: 0 kW</div>
            </div> */}
            <div className="small-space_DCq"></div>
        </div>
    </div>
}

const panelStyle = {
    position: 'absolute',
    width: 300,
}

const $Panel = ({ title, children, react }) => {
    const [position, setPosition] = react.useState({ top: 100, right: 10 });
    const [dragging, setDragging] = react.useState(false);
    const [rel, setRel] = react.useState({ x: 0, y: 0 }); // Position relative to the cursor

    const onMouseDown = (e) => {
        if (e.button !== 0) return; // Only left mouse button
        const panelElement = e.target.closest('.panel_YqS');

        // Calculate the initial relative position
        const rect = panelElement.getBoundingClientRect();
        setRel({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        setDragging(true);
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseUp = (e) => {
        setDragging(false);
        // Remove window event listeners when the mouse is released
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    const onMouseMove = (e) => {
        if (!dragging) return;

        setPosition({
            top: e.clientY - rel.y,
            right: window.innerWidth - e.clientX - (panelStyle.width - rel.x),
        });
        e.stopPropagation();
        e.preventDefault();
    }

    const draggableStyle = {
        ...panelStyle,
        top: position.top + 'px',
        right: position.right + 'px',
    }

    react.useEffect(() => {
        if (dragging) {
            // Attach event listeners to window
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            // Clean up event listeners when the component unmounts or dragging is finished
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragging]); // Only re-run the effect if dragging state changes

    return (
        <div className="panel_YqS" style={draggableStyle}>
            <div className="header_H_U header_Bpo child-opacity-transition_nkS"
                 onMouseDown={onMouseDown}>
                <div className="title-bar_PF4">
                    <div className="icon-space_h_f"></div>
                    <div className="title_SVH title_zQN">{title}</div>
                </div>
            </div>
            <div className="content_XD5 content_AD7 child-opacity-transition_nkS">
                {children}
            </div>
        </div>
    );
}

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

// Used when max value (right) indicates that everything is OK ("Electricity Availability" for example)
const maxGood = 'linear-gradient(to right,rgba(255, 78, 24, 1.000000) 0.000000%, rgba(255, 78, 24, 1.000000) 40.000000%, rgba(255, 131, 27, 1.000000) 40.000000%, rgba(255, 131, 27, 1.000000) 50.000000%, rgba(99, 181, 6, 1.000000) 50.000000%, rgba(99, 181, 6, 1.000000) 60.000000%, rgba(71, 148, 54, 1.000000) 60.000000%, rgba(71, 148, 54, 1.000000) 100.000000%)'
// Used when min value (left) indicates everything is fine ("Fire Hazard" for example)
const minGood = 'linear-gradient(to right,rgba(71, 148, 54, 1.000000) 0.000000%, rgba(99, 181, 6, 1.000000) 66.000000%, rgba(255, 131, 27, 1.000000) 33.000000%, rgba(255, 78, 24, 1.000000) 100.000000%)'

const eventsToListenTo = [
    ['Electricity', 'electricityInfo.electricityAvailability', maxGood],
    ['Water Availability', 'waterInfo.waterAvailability', maxGood],
    ['Sewage', 'waterInfo.sewageAvailability', maxGood],
    ['Landfill Usage', 'garbageInfo.landfillAvailability', maxGood],
    // TODO Incineration
    ['Healthcare Availability', 'healthcareInfo.healthcareAvailability', maxGood],
    ['Average Health', 'healthcareInfo.averageHealth', maxGood],
    ['Cemetery Availability', 'healthcareInfo.cemeteryAvailability', maxGood],
    // TODO Crematorium
    ['Fire Hazard', 'fireAndRescueInfo.averageFireHazard', minGood],
    ['Crime Rate', 'policeInfo.averageCrimeProbability', minGood],
    ['Jail Availability', 'policeInfo.jailAvailability', maxGood],
    ['Elementary School Availability', 'educationInfo.elementaryAvailability', maxGood],
    ['High School Availability', 'educationInfo.highSchoolAvailability', maxGood],
    ['College Availability', 'educationInfo.collegeAvailability', maxGood],
    ['University Availability', 'educationInfo.universityAvailability', maxGood],
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