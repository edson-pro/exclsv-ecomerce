const formatBanner = (e): any => {
  return {
    id: e.id,
    title: e.title,
    tag: e.tag,
    subtitle: e.subtitle,
    image: e.image,
    type: e.type,
    action: e.action,
    link: e.link,
    createdAt: e.createdAt,
  };
};

export default formatBanner;
