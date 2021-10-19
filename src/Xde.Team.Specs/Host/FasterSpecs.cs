using FASTER.core;
using System.Reflection;
using Xunit;

namespace Xde.Host
{
    //TODO:
    public class FasterSpecs : IDisposable
    {
        private readonly string _root;
        private readonly string _id;
        private readonly string _path;
        private readonly IDevice _device;

        public FasterSpecs()
        {
            _root = new FileInfo(Assembly.GetExecutingAssembly().Location).DirectoryName ?? Path.GetTempPath();
            _id = Guid.NewGuid().ToString("N");
            _path = Path.Combine(_root, $"{_id}.fl");

            _device = Devices.CreateLogDevice(_path);
        }

        public void Dispose()
        {
            _device.Dispose();
            // TODO:
            File.Delete(_path + ".0");
        }

        [Fact]
        public async void TestLog()
        {
            using var log = new FasterLog(new FasterLogSettings { LogDevice = _device });

            await log.EnqueueAsync(new byte[2] { 0x12, 0x34 });
            await log.CommitAsync();

            // TODO:
            Assert.True(File.Exists(_path + ".0"));
        }

        [Fact]
        public async void TestKV()
        {
            using var store = new FasterKV<long, long>(
                size: 1L << 20, // 1M cache lines of 64 bytes each = 64MB hash table
                logSettings: new LogSettings { LogDevice = _device } // specify log settings (e.g., size of log in memory)
            );

            // Create functions for callbacks; we use a standard in-built function in this sample
            // although you can write your own by extending FunctionsBase or implementing IFunctions
            // In this in-built function, read-modify-writes will perform value merges via summation
            var funcs = new SimpleFunctions<long, long>((a, b) => a + b);

            // Each logical sequence of calls to FASTER is associated
            // with a FASTER session. No concurrency allowed within
            // a single session
            using var session = store.NewSession(funcs);

            long key = 7, value = 8;
            session.Upsert(ref key, ref value);

            store.Log.ShiftReadOnlyAddress(store.Log.TailAddress, true);

            // TODO:
            Assert.True(File.Exists(_path + ".0"));
        }

        [Fact]
        public async void TestLogAndKV()
        {
            // TODO: shares same device
        }
    }
}
