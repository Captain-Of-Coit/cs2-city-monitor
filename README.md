# City Monitor for Cities: Skylines 2

Displays a little window so you can see the most important details of your city without having to open up any panels manually.

https://github.com/Captain-Of-Coit/cs2-city-monitor/assets/126259864/c75e0b7f-ac10-4086-af54-44e9b19e5fdf

Should display the following stats:

- Electricity availability (`electricityInfo.electricityAvailability`)
- Water availability (`waterInfo.waterAvailability`)
- Sewage treatment (`waterInfo.sewageAvailability`)
- Landfill usage (`garbageInfo.landfillAvailability`)
- Incineration status TODO
- Healthcare availability (`healthcareInfo.healthcareAvailability`)
- Average health (`healthcareInfo.averageHealth`)
- Cemetery usage (`healthcareInfo.cemeteryAvailability`)
- Crematorium availability TODO
- Fire hazard (`fireAndRescueInfo.averageFireHazard`)
- Crime rate (`policeInfo.averageCrimeProbability`)
- Jail availability (`policeInfo.jailAvailability`)
- Elementary school availability (`educationInfo.elementaryAvailability`)
- High school availability (`educationInfo.highSchoolAvailability`)
- College availability (`educationInfo.collegeAvailability`)
- University availability (`educationInfo.universityAvailability`)
- Employment rate TODO

## Requirements

- Cities: Skylines 2
- BepInEx-Unity.Mono-win-x64-6.0.0-be.674+82077ec
- [HookUI 0.0.1](https://github.com/Captain-Of-Coit/hookui)

## Installation

- Download latest release.
- Extract the ZIP archive
- Place in "Cities2_Data\StreamingAssets\~UI~\HookUI\Extensions" directory, within your game directory