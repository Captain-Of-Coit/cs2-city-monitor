using Game.UI;
using Colossal.UI.Binding;
using System.Collections.Generic;
using Colossal.Annotations;
using System;
using System.Collections.Immutable;

namespace CityMonitor.Systems {

    public record MeterSetting : IJsonWritable {
        public string label;
        public string eventName;
        public int index;
        public string gradientName;
        public bool isEnabled;

        public void Write(IJsonWriter writer) {
            writer.TypeBegin(this.GetType().FullName);

            writer.PropertyName("label");
            writer.Write(this.label);

            writer.PropertyName("eventName");
            writer.Write(this.eventName);

            writer.PropertyName("index");
            writer.Write(this.index);

            writer.PropertyName("gradientName");
            writer.Write(this.gradientName);

            writer.PropertyName("isEnabled");
            writer.Write(this.isEnabled);

            writer.TypeEnd();
        }
    }

    class CityMonitorUISystem : UISystemBase {
        private ImmutableDictionary<string, MeterSetting> meters;

        private string kGroup = "city_monitor";
        protected override void OnCreate() {
            base.OnCreate();

            var builder = ImmutableDictionary.CreateBuilder<string, MeterSetting>();

            AddMeter(builder, 0, "electricity", "Electricity Availability", "electricityInfo.electricityAvailability", "maxGood");
            AddMeter(builder, 1, "water", "Water Availability", "waterInfo.waterAvailability", "maxGood");
            AddMeter(builder, 2, "sewage", "Sewage", "waterInfo.sewageAvailability", "maxGood");
            AddMeter(builder, 3, "landfill", "Landfill Usage", "garbageInfo.landfillAvailability", "maxGood");
            AddMeter(builder, 4, "healthcare", "Healthcare Availability", "healthcareInfo.healthcareAvailability", "maxGood");
            AddMeter(builder, 5, "health", "Average Health", "healthcareInfo.averageHealth", "maxGood");
            AddMeter(builder, 6, "cemetery", "Cemetery Availability", "healthcareInfo.cemeteryAvailability", "maxGood");
            AddMeter(builder, 7, "fire_hazard", "Fire Hazard", "fireAndRescueInfo.averageFireHazard", "minGood");
            AddMeter(builder, 8, "crime", "Crime Rate", "policeInfo.averageCrimeProbability", "minGood");
            AddMeter(builder, 9, "jail", "Jail Availability", "policeInfo.jailAvailability", "maxGood");
            AddMeter(builder, 10, "elementary", "Elementary School Availability", "educationInfo.elementaryAvailability", "maxGood");
            AddMeter(builder, 11, "highschool", "High School Availability", "educationInfo.highSchoolAvailability", "maxGood");
            AddMeter(builder, 12, "collage", "College Availability", "educationInfo.collegeAvailability", "maxGood");
            AddMeter(builder, 13, "university", "University Availability", "educationInfo.universityAvailability", "maxGood");

            meters = builder.ToImmutableDictionary();

            this.AddUpdateBinding(new GetterValueBinding<ImmutableDictionary<string, MeterSetting>>(kGroup, "meters", () => {
                return meters;
            }, new MyDictionaryWriter<string, MeterSetting>()));


            this.AddBinding(new TriggerBinding<string, bool>(kGroup, "toggle_visibility", new Action<string, bool>(ToggleVisibility)));
        }

        private void AddMeter(ImmutableDictionary<string, MeterSetting>.Builder builder, int index, string key, string label, string eventName, string gradient) {
            builder.Add(key, new MeterSetting {
                label = label,
                eventName = eventName,
                index = index,
                gradientName = gradient,
                isEnabled = false,
            });
        }

        private void ToggleVisibility(string key, bool newValue) {
            var oldMeter = meters[key];
            oldMeter.isEnabled = newValue;

            var newMeters = meters.Remove(key).Add(key, oldMeter);
            this.meters = newMeters;
        }
    }

    public class MyDictionaryWriter<K, V> : IWriter<IDictionary<K, V>> {
        [NotNull]
        private readonly IWriter<K> m_KeyWriter;

        [NotNull]
        private readonly IWriter<V> m_ValueWriter;

        public MyDictionaryWriter(IWriter<K> keyWriter = null, IWriter<V> valueWriter = null) {
            m_KeyWriter = keyWriter ?? ValueWriters.Create<K>();
            m_ValueWriter = valueWriter ?? ValueWriters.Create<V>();
        }

        public void Write(IJsonWriter writer, IDictionary<K, V> value) {
            if (value != null) {
                writer.MapBegin(value.Count);
                foreach (KeyValuePair<K, V> item in value) {
                    m_KeyWriter.Write(writer, item.Key);

                    if (item.Value is IDictionary<K, V> nestedDictionary) {
                        Write(writer, nestedDictionary);
                    }
                    else {
                        m_ValueWriter.Write(writer, item.Value);
                    }
                }
                writer.MapEnd();
                return;
            }

            writer.WriteNull();
            throw new ArgumentNullException("value", "Null passed to non-nullable dictionary writer");
        }
    }
}