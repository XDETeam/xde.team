namespace Xde.Lab.MeshFs
{
    public interface IWebDavCommand
    {
        string Method { get; }

        Task Process(HttpContext context);
    }
}
