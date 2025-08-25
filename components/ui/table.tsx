import * as React from "react";
export function Table({ children }: { children: React.ReactNode }) { return (<div className="w-full overflow-x-auto"><table className="min-w-full divide-y divide-gray-200">{children}</table></div>); }
export function THead({ children }: { children: React.ReactNode }) { return <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-600">{children}</thead>; }
export function TH({ children }: { children: React.ReactNode }) { return <th scope="col" className="px-4 py-3">{children}</th>; }
export function TBody({ children }: { children: React.ReactNode }) { return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>; }
export function TR({ children }: { children: React.ReactNode }) { return <tr className="hover:bg-gray-50">{children}</tr>; }
export function TD({ children }: { children: React.ReactNode }) { return <td className="px-4 py-3 text-sm text-gray-800">{children}</td>; }