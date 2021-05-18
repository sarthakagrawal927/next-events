import Layout from "../components/layout";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registeration";

function HomePage({ featuredEvents }) {
  return (
    <Layout title='Events Powered by NextJS'>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return { props: { featuredEvents: featuredEvents }, revalidate: 1800 };
}

export default HomePage;
