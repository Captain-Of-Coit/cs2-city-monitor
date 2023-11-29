using Game;
using Game.Common;
using HarmonyLib;
using CityMonitor.Systems;

namespace CityMonitor.Patches {

    [HarmonyPatch(typeof(SystemOrder))]
    public static class SystemOrderPatch {
        [HarmonyPatch("Initialize")]
        [HarmonyPostfix]
        public static void Postfix(UpdateSystem updateSystem) {
            updateSystem.UpdateAt<CityMonitorUISystem>(SystemUpdatePhase.UIUpdate);
        }
    }
}