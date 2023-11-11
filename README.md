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

- [Cities: Skylines 2](https://store.steampowered.com/app/949230/Cities_Skylines_II/)
- [BepInEx-Unity.Mono-win-x64-6.0.0-be.674+82077ec](https://builds.bepinex.dev/projects/bepinex_be)
- [HookUI 0.0.1](https://github.com/Captain-Of-Coit/hookui) or newer

## Installation

- Make sure BepInEx 6.0.0 is installed
- Make sure HookUI is installed
- Download latest release from GitHub - [https://github.com/Captain-Of-Coit/cs2-city-monitor/releases](https://github.com/Captain-Of-Coit/cs2-city-monitor/releases)
- Extract the ZIP archive
- Place `city_monitor.transpiled.js` in `Cities2_Data\StreamingAssets\~UI~\HookUI\Extensions` directory, within your game directory
