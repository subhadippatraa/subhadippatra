type Category = { name: string; skills: string[] };

export function SkillPills({ categories }: { categories: Category[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <div key={cat.name} className="card">
          <h3 className="text-lg font-semibold">{cat.name}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <li key={s} className="inline-flex px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

