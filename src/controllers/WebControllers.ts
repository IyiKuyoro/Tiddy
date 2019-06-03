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

  public static RenderSupportPage(req: any, res: any) {
    res.render('support', {
      title: 'Support',
    });
  }
}

export default WebController;
