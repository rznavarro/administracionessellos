import StaggeredMenu, { type StaggeredMenuItem, type StaggeredMenuSocialItem } from '../reactbits/StaggeredMenu';

interface Props {
  items: { label: string; href: string }[];
  contacts: { label: string; href: string }[];
}

export default function MobileMenu({ items, contacts }: Props) {
  const menuItems: StaggeredMenuItem[] = items.map(item => ({ label: item.label, ariaLabel: item.label, link: item.href }));
  const socialItems: StaggeredMenuSocialItem[] = contacts.map(item => ({ label: item.label, link: item.href }));
  const lockScroll = (locked: boolean) => {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  };

  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems}
      socialItems={socialItems}
      socialsTitle="Contacto"
      toggleLabels={['Menú', 'Cerrar']}
      colors={['#1E3F6E', '#2D6098']}
      accentColor="#2D6098"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#152A45"
      changeMenuColorOnOpen
      onMenuOpen={() => lockScroll(true)}
      onMenuClose={() => lockScroll(false)}
    />
  );
}
