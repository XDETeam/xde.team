using System.ComponentModel.DataAnnotations.Schema;

namespace Xde.Lab.MeshFs;

public class Flow
{
    public long Id { get; set; }

    public string Topic { get; set; }

    public DateTime Created { get; set; }
}
