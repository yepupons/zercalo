const Footer = () => (
  <footer className="border-t bg-muted/30 mt-auto">
    <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="font-serif text-base text-foreground">Зерцало</p>
      <p>Историко-лингвистический проект · XVIII век</p>
      <p>© {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;
