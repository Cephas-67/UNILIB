const stats = [
  { value: "1200+", label: "épreuves" },
  { value: "18", label: "écoles" },
  { value: "250+", label: "étudiants inscrits" },
];

const StatsSection = () => {
  return (
    <section className="bg-stats py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-poppins font-semibold text-2xl text-center text-primary-foreground mb-10">
          Nos chiffres
        </h2>
        <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-poppins font-bold text-4xl lg:text-5xl text-primary-foreground">
                {stat.value}
              </div>
              <div className="font-inter text-sm lg:text-base text-primary-foreground mt-1 opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
