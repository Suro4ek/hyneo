import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { User } from "~/models/user.server";
import type { Category } from "~/models/category.server";
import type { Method } from "~/models/method.server";

export function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
}

export function useMatchesData(
    id: string
  ): Record<string, unknown> | undefined {
    const matchingRoutes = useMatches();
    const route = useMemo(
      () => matchingRoutes.find((route) => route.id === id),
      [matchingRoutes, id]
    );
    return route?.data;
  }
  
  function isUser(user: any): user is User {
    return user && typeof user === "object" && typeof user.email === "string";
  }
  
export function useOptionalUser(): User | undefined {
    const data = useMatchesData("root");
    if (!data || !isUser(data.user)) {
      return undefined;
    }
    return data.user;
  }

export function useOptionalCategories(): Category[] | undefined {
    const data = useMatchesData("routes/index");
    if (!data || !Array.isArray(data.categories)) {
      return undefined;
    }
    return data.categories;
}

export function useOptionalMethods(): Method[] | undefined {
    const data = useMatchesData("routes/index");
    if (!data || !Array.isArray(data.methods)) {
      return undefined;
    }
    return data.methods;
}

export function useMethods(): Method[] {
    const methods = useOptionalMethods();
    if (!methods) {
      return [];
    }
    return methods;
}
  
export function useCategories(): Category[]{
    const categories = useOptionalCategories();
    if(!categories){
        return [];
    }
    return categories;
}

  export function useUser(): User {
    const maybeUser = useOptionalUser();
    if (!maybeUser) {
      throw new Error(
        "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
      );
    }
    return maybeUser;
  }
  
  export function validateUsername(username: unknown): username is string {
    return typeof username === "string" && username.length > 3;
  }