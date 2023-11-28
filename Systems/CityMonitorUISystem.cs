using Game.UI;
using Colossal.UI.Binding;
using System.Collections.Generic;
using Colossal.Annotations;
using System;

namespace CityMonitor.Systems {

    class MeterSetting : IJsonWritable {
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
        private Dictionary<string, MeterSetting> meters = new Dictionary<string, MeterSetting>();

        private string kGroup = "city_monitor";
        protected override void OnCreate() {
            base.OnCreate();

            meters.Add("electricity", new MeterSetting {
                label = "Electricity Availability",
                eventName = "electricityInfo.electricityAvailability",
                index = 0,
                gradientName = "maxGood",
                isEnabled = true,
            });

            this.AddUpdateBinding(new GetterValueBinding<Dictionary<string, MeterSetting>>(this.kGroup, "meters", () => {
                return meters;
            }, new MyDictionaryWriter<string, MeterSetting>()));


            //this.AddUpdateBinding(new GetterValueBinding<Dictionary<string, MeterSetting>>(this.kGroup, "meters", () => {
            //    return meters;
            //}));

            //this.AddUpdateBinding(
            //    (IUpdateBinding)new GetterValueBinding<AppBindings.FrameTiming>(
            //        "app",
            //        "frameStats",
            //        (Func<AppBindings.FrameTiming>)(() => AppBindings.m_FrameTiming),
            //        (IWriter<AppBindings.FrameTiming>)new ValueWriter<AppBindings.FrameTiming>())
            //   );

            UnityEngine.Debug.Log("onCreate CityMonitor done");
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

                    // If V is a directory, recursively call Write
                    if (item.Value is IDictionary<K, V> nestedDictionary) {
                        Write(writer, nestedDictionary);
                    } else {
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