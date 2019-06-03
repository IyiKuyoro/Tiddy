class HomeController {
  public static RenderHomePage(req: any, res: any) {
    res.render('home', {
      title: 'Install Tiddy',
    });
  }
}

export default HomeController;
