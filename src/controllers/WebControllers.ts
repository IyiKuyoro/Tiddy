class WebController {
  public static RenderHomePage(req: any, res: any) {
    res.render('home', {
      title: 'Install Tiddy',
    });
  }

  public static RenderPrivacyPage(req: any, res: any) {
    res.render('privacy', {
      title: 'Privacy Policy',
    });
  }
}

export default WebController;
