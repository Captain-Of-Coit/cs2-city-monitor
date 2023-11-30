# City Monitor for Cities: Skylines 2

This mod displays the most important details of your city in an overlay so you can monitor your vitals as you build.

https://github.com/Captain-Of-Coit/cs2-city-monitor/assets/126259864/c75e0b7f-ac10-4086-af54-44e9b19e5fdf

**Important**: Mods are not yet officially supported in Cities: Skylines 2. Use this mod at your own risk.

## Available stats

You can currently monitor the following stats:

- Electricity availability (`electricityInfo.electricityAvailability`)
- Water availability (`waterInfo.waterAvailability`)
- Sewage treatment (`waterInfo.sewageAvailability`)
- Landfill usage (`garbageInfo.landfillAvailability`)
- Healthcare availability (`healthcareInfo.healthcareAvailability`)
- Average health (`healthcareInfo.averageHealth`)
- Cemetery usage (`healthcareInfo.cemeteryAvailability`)
- Fire hazard (`fireAndRescueInfo.averageFireHazard`)
- Crime rate (`policeInfo.averageCrimeProbability`)
- Jail availability (`policeInfo.jailAvailability`)
- Elementary school availability (`educationInfo.elementaryAvailability`)
- High school availability (`educationInfo.highSchoolAvailability`)
- College availability (`educationInfo.collegeAvailability`)
- University availability (`educationInfo.universityAvailability`)

### Stats coming soon

- Incineration status
- Crematorium availability
- Employment rate

## Requirements

Before you install this mod, install:

- [Cities: Skylines 2](https://store.steampowered.com/app/949230/Cities_Skylines_II/)
- [BepInEx-Unity.Mono-win-x64-6.0.0-be.674+82077ec](https://builds.bepinex.dev/projects/bepinex_be)
- [HookUI 0.3.2](https://github.com/Captain-Of-Coit/hookui) or newer

## Install the City Monitor mod

1. Download the [latest release from GitHub](https://github.com/Captain-Of-Coit/cs2-city-monitor/releases).
1. Extract the files in the ZIP file to a local folder.
1. Copy the `city_monitor.transpiled.js` file to the `Cities2_Data\StreamingAssets\~UI~\HookUI\Extensions` directory, which on Windows is typically located in `C:\Program Files (x86)\Steam\steamapps\common\Cities Skylines II\Cities2_Data\StreamingAssets\~UI~\HookUI\Extensions`.
