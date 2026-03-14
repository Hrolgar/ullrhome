interface Props {
  contact: any;
}

export default function Contact({ contact }: Props) {
  if (!contact) return null;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary">Get in Touch</h2>
        {contact.availableForWork && (
          <p className="text-accent mb-6 font-medium">
            Currently available for new opportunities
          </p>
        )}
        <div className="flex flex-col items-center gap-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-lg text-muted hover:text-foreground transition-colors"
            >
              {contact.email}
            </a>
          )}
          <div className="flex gap-6 mt-4">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                GitHub
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
          {contact.location && (
            <p className="text-muted mt-4">{contact.location}</p>
          )}
        </div>
      </div>
    </section>
  );
}
